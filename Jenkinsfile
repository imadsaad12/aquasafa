pipeline{
    agent any
    stages{
        stage("building"){
            steps{
               sh 'cd aquasafa && npm install'
            }
        }
        stage("testing"){
            steps{
                echo "========testing Application========"
            }
        }
    }
   
}