pipeline {
   agent none
    stages{
        stage("building"){

                 agent {
                     Docker {
                          image 'node:17-alpine'
                            }
              
                         }
          
            steps{
              dir ('backend') {
                 
                    sh 'docker build  -t backend-image .'
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