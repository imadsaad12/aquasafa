pipeline{
    agent any
    stages{
        stage("building"){
            steps{
              dir ('backend') {
                  nodejs("Node"){
                   sh 'sudo docker build -t backend-image .'
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