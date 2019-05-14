node {
    def build_number = env.BUILD_NUMBER
    def version = "0.1.0.${build_number}"
    def last_commit = ""

    stage("Checkout") {
        checkout scm
        sh "ls -l"
        last_commit = sh (
            script: "git rev-parse HEAD",
            returnStdout: true
        ).trim() 
    }

    docker.image("node:8-jessie").inside {
        withEnv(['HOME=.']) {
            stage("Unit Tests") {
                try {
                    sh "npm install"
                    sh "npm test"
                } catch (e) {
                    sh "curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"Webinar project, unit tests failed!\"}' https://hooks.slack.com/services/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"
                    currentBuild.result = "FAILURE"
                    throw e
                }
            }

            stage("Build") {
                try {
                    sh "npm run-script build"
                    sh "cd dist && cp ../package.json . && npm install --production && rm -fr .npm && cd .."
                    sh "echo ${version} >> dist/public/version.txt"
                    sh "echo ${last_commit} >> dist/public/version.txt"
                    sh "tar cvzf dist.tar.gz dist"
                } catch (e) {
                    sh "curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"Webinar project, build failed!\"}' https://hooks.slack.com/services/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"
                    currentBuild.result = "FAILURE"
                    throw e
                }
            } 
        }
    }

    docker.image("maven").inside {
        stage("Release to Nexus") {
            withCredentials([usernamePassword(credentialsId: 'nexus', 
                                        usernameVariable: 'NEXUS_USERNAME', 
                                        passwordVariable: 'NEXUS_PASSWORD')]) {
                sh "mvn deploy:deploy-file \
                    -DgroupId=it.etiqa \
                    -DartifactId=webinar-project \
                    -Dversion=${version} \
                    -Dpackaging=tar.gz \
                    -Dfile=dist.tar.gz \
                    -DgeneratePom=true \
                    -DupdateReleaseInfo=true \
                    -Durl='http://${NEXUS_USERNAME}:${NEXUS_PASSWORD}@host.docker.internal:8081/repository/maven-releases'"

            }
        }
    }    

}