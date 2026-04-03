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
                    docker compose down || true
                    docker rm -f ba-backend ba-frontend || true
                    docker compose up -d --force-recreate
                '''
            }
        }

        stage('Verify') {
            steps {
                sh 'docker compose ps'
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 5
                    curl -f http://localhost:5000 || exit 1
                '''
            }
        }
    }
}