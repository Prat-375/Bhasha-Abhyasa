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

        stage('Wait for Backend') {
            steps {
                sh '''
                    echo "Waiting for backend to become healthy..."

                    timeout=120
                    elapsed=0

                    while true; do
                        status=$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}no-healthcheck{{end}}' ba-backend 2>/dev/null || echo "missing")

                        echo "Current backend status: $status"

                        if [ "$status" = "healthy" ]; then
                            echo "Backend is healthy"
                            break
                        fi

                        if [ "$status" = "unhealthy" ] || [ "$status" = "exited" ] || [ "$status" = "missing" ]; then
                            echo "Backend failed to start"
                            docker logs ba-backend || true
                            exit 1
                        fi

                        if [ $elapsed -ge $timeout ]; then
                            echo "Timed out waiting for backend"
                            docker compose ps -a
                            docker logs ba-backend || true
                            exit 1
                        fi

                        sleep 5
                        elapsed=$((elapsed + 5))
                    done
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