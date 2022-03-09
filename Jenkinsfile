pipeline{
    agent any
    stages{
        stage("building"){
            steps{
               echo "$WORKSPACE"
              dir("aquasafa"){
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