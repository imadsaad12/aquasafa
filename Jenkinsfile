pipeline{
    agent any
    stages{
        stage("building"){
            steps{
             
              dir ('aquasafa') {
                  echo "$WORKSPACE"
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