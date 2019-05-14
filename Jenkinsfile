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
}