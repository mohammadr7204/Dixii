import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
});

// extract L1 CfnUserPool resources
// const { cfnUserPool } = backend.auth.resources.cfnResources;
// // update the schema property to add custom attributes
// if (Array.isArray(cfnUserPool.schema)) {
//   cfnUserPool.schema.push({
//     name: 'database_id',
//     mutable: false,
//     attributeDataType: 'String',
//     developerOnlyAttribute: false,
    
    
//   });
  
// }