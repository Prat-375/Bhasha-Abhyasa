pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Create env file') {
            steps {
                withCredentials([string(credentialsId: 'backend-env', variable: 'BACKEND_ENV')]) {
                    sh '''
                        set -e
                        mkdir -p backend
                        printf "%s" "$BACKEND_ENV" > backend/.env
                        chmod 600 backend/.env

                        echo "Current directory:"
                        pwd

                        echo "Checking backend folder:"
                        ls -la backend

                        echo "Confirming .env exists:"
                        test -f backend/.env && echo ".env created successfully"
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    set -e
                    pwd
                    ls -la
                    ls -la backend
                    docker compose up -d --force-recreate
                '''
            }
        }

        stage('Verify') {
            steps {
                sh 'docker compose ps'
            }
        }
    }
}