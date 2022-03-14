// pipeline{
//     agent any
//     stages{
//         stage("building"){
//             steps{
//                  dir ("aquasafa"){
//                 nodejs("Node"){
//                       sh 'yarn install'
//                      // sh 'yarn run test'
//                  }
//                 }
//                  dir ("backend"){
//                 nodejs("Node"){
//                       sh 'yarn install'
//                      // sh 'yarn run test'
//                  }
//                 }
//             }
//         }
//         // stage("building"){
//         //     steps{
//         //           nodejs("Node"){
//         //               sh 'docker compose up'
//         //       }
//         //     }
//         // }
//         stage("testing"){
//             steps{
//                 dir ("aquasafa"){
//                 nodejs("Node"){
//                       sh 'yarn run test'
//               }
//                 }
//             }
//         }
//     }
   
// }



pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub')
		HEROKU_CREDENTIALS=credentials('HerokuCli')
	}
	stages {
		stage('Build') {
			steps {
                // dir ('aquasafa'){
				// nodejs("Node"){
				// sh 'yarn install'
				// }	
				sh 'docker build -t isdocker12/aqua-safa:latest .'
                // }
				// nodejs("Node"){
				// sh 'npm install'
				// }
				//sh 'docker build -t isdocker12/aqua-safa:latest .'
			}
		}
		stage('Login dockerhub & heroku') {
			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
				sh '(echo "$HEROKU_CREDENTIALS_USR" echo "$HEROKU_CREDENTIALS_PSW") | heroku login'
			}
		}
		stage('Push to heroku') {
			steps {
				//sh 'docker push isdocker12/aqua-safa:latest'
				sh 'heroku git:remote -a aquasafa'
				sh 'git push heroku master'
			}
		}
	}
}