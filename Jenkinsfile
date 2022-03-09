pipeline{
    agent any
    stages{
        stage("building"){
            steps{

              dir ('aquasafa') {
                  nodejs("Node"){
                   bat 'cd aquasafa'
                   echo '$WORKSPACE'
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