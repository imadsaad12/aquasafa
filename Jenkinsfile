pipeline{
    agent any
    stages{
        stage("building"){
            steps{
               echo "$WORKSPACE"
               sh 'cd aquasafa'
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