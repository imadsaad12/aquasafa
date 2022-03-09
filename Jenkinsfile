pipeline{
    agent any
    stages{
        stage("building"){
            steps{
              dir("backend"){
               nodejs("Node"){
                //sh "pwd"
               echo "$WORKSPACE"
               
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