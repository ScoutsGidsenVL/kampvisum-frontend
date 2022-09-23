pipeline {
  agent any

  options {
    buildDiscarder(logRotator(artifactNumToKeepStr: '10'))
  }

  stages {
    stage('build') {
      steps {
        sh "npm prune --ignore-scripts"
        sh "rm -rf node_modules/inuits-vuejs-oidc node_modules/vue-3-component-library"
        sh "npm install --ignore-scripts"
        sh "rm -rf dist frontend.zip"
        sh "npm run build"
        sh "zip -r frontend.zip dist/*"
      }
    }

    stage('archive') {
      when {
        anyOf {
          branch "production"
          branch "staging"
        }
      }
      steps {
        rtUpload (
          serverId: 'artifactory',
          spec: '''{
            "files": [
              {
                "pattern": "frontend.zip",
                "target": "kampvisum-frontend/${BRANCH_NAME}/${BUILD_ID}/"
              }
           ]
          }'''
        )
      }
    }

    stage('deploy') {
      steps {
        sh 'ssh az-deb-mgmt sudo -u ansible /opt/deploy-kamp.sh frontend ${BRANCH_NAME}'
      }
    }
  }

  post {
    failure {
      emailen()
    }
    unstable {
      emailen()
    }
    changed {
      emailen()
    }
  }
}

def emailen() {
  mail(
    to: "tvl@scoutsengidsenvlaanderen.be,${env.CHANGE_AUTHOR_EMAIL},jr@scoutsengidsenvlaanderen.be,ricardo@inuits.eu",
    subject: "[Jenkins] ${currentBuild.fullDisplayName} ${currentBuild.currentResult}",
    body: """${currentBuild.fullDisplayName} ${currentBuild.currentResult}

${currentBuild.absoluteUrl}"""
  )
}
