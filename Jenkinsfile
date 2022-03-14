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
		// stage('Build') {
		// 	steps {
        //         dir ('aquasafa'){
		// 		nodejs("Node"){
		// 		sh 'yarn install'
		// 		}	
		// 		sh 'docker build -t isdocker12/aqua-safa:latest .'
        //         }
		// 		nodejs("Node"){
		// 		sh 'npm install'
		// 		}
		// 		sh 'docker build -t isdocker12/aqua-safa:latest .'
		// 	}
		// }
		stage('Login dockerhub & heroku') {
			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
				sh '(echo "$HEROKU_CREDENTIALS_USR" echo "$HEROKU_CREDENTIALS_PSW") | heroku login'
			}
		}
		stage('Push to heroku') {
			steps {
				//sh 'docker push isdocker12/aqua-safa:latest'
				sh 'cd home'
				sh 'mkdir aquasafa'
				sh 'cd aquasafa'
				sh 'git clone https://github.com/imadsaad12/aquasafa.git'
				sh 'git init'
				sh 'git remote add origin https://github.com/imadsaad12/aquasafa.git'
				sh 'git add . '
				sh "git commit -m 'deploy' "
				sh 'git push origin master '
				sh 'heroku git:remote -a aquasafa'
				sh 'git push heroku master'
			}
		}
	}
}