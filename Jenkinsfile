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

        stage('Check env file') {
            steps {
                sh '''
                    echo "Checking required keys in backend/.env"
                    grep -q '^MONGO_URI=' backend/.env && echo "MONGO_URI exists" || (echo "MONGO_URI missing" && exit 1)
                    grep -q '^PORT=' backend/.env && echo "PORT exists" || echo "PORT missing"
                    echo "Line count in backend/.env:"
                    wc -l backend/.env
                '''
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

        stage('Check container env') {
            steps {
                sh '''
                    docker compose ps -a
                    docker run --rm --env-file backend/.env alpine sh -c 'env | grep "^MONGO_URI=" >/dev/null && echo "MONGO_URI passed correctly" || echo "MONGO_URI not passed"'
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
                sh 'docker compose ps -a'
            }
        }
    }
}