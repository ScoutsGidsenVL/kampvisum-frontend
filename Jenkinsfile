pipeline {
  agent any

  options {
    buildDiscarder(logRotator(artifactNumToKeepStr: '10'))
  }

  stages {
    stage('build') {
      steps {
        sh "npm prune --ignore-scripts"
        sh "rm -rf node_modules/inuits-* node_modules/vue-3-component-library"
        sh "npm install --ignore-scripts"
        sh "rm -rf dist kampvisum.zip"
        sh "npm run build"
        sh "zip -r kampvisum.zip dist/*"
      }
    }

    stage('archive') {
      steps {
        archiveArtifacts 'kampvisum.zip'

        script{
            def artifactory = Artifactory.server 'artifactory'

            def uploadSpec = '''{
              "files": [
                {
                  "pattern": "kampvisum.zip",
                  "target": "kampvisum-frontend/${BRANCH_NAME}/${BUILD_ID}/"
                }
             ]
            }'''

            def buildInfo = artifactory.upload spec: uploadSpec

            artifactory.publishBuildInfo buildInfo
        }
      }
    }

    stage('deploy') {
      steps {
        sh 'ssh lxc-deb-rundeck.vvksm.local sudo -u rundeck /opt/deploy-kamp.sh frontend ${BRANCH_NAME}'
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
    to: "tvl@scoutsengidsenvlaanderen.be,${env.CHANGE_AUTHOR_EMAIL}",
    subject: "[Jenkins] ${currentBuild.fullDisplayName} ${currentBuild.currentResult}",
    body: """${currentBuild.fullDisplayName} ${currentBuild.currentResult}

${currentBuild.absoluteUrl}"""
  )
}
