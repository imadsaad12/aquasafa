pipeline{
    agent any
    stages{
        stage("building"){
            steps{
              dir ('backend') {
                  nodejs("Node"){
                   sh 'docker build -u 0 -t backend-image .'
               }
              }
            }
        }
        stage("testing"){
            steps{
                echo "========testing Application========"
            }
        }
    }
   
}