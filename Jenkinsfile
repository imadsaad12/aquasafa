pipeline{
    agent any
    stages{
        stage("building"){
            steps{
               echo "pwd"
              dir("backend"){
               nodejs("Node"){
                //sh "pwd"
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