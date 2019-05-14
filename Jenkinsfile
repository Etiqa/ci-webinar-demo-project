node {
    stage("Checkout") {
        checkout scm
        sh "ls -l"
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
        }
    }
}