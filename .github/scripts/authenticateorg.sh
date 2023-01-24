echo ${SECRET_URL_PATH} > ./CI_SFDX_URL.txt && 
sfdx force:auth:sfdxurl:store -f ./CI_SFDX_URL.txt -a ${SOURCE_ORG_ALIAS} -d