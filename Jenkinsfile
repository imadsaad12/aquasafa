pipeline{
    agent any
    stages{
        stage("building"){
            steps{

              dir ('aquasafa') {
                  nodejs("Node"){
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