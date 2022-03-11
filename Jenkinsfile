pipeline{
    agent any
    stages{
        stage("building"){
            steps{
              dir ('backend') {
                  //nodejs("Node"){
                      //sh 'dockerd'
                      
               //}
               docker{
                    sh 'docker build  -t backend-image .'
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