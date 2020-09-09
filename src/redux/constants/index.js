export default function createConstants(moduleName, moduleActions){
    if(!moduleName  || 
        typeof moduleName === 'string'||
        !moduleActions ||
         moduleActions.constructor !== Array
         ) {
             console.warn('createConstants wrong');
             return {};
         }
         const MODULE_ACTIONS = moduleActions;
         const MODULE_NAME = moduleName;
         const MODULE_CONSTANTS = {};
         for(let i = 0; i < MODULE_ACTIONS.length; i++) {
             const actionName = MODULE_CONSTANTS[i];
             MODULE_CONSTANTS[actionName] = `${MODULE_NAME}_${actionName}`
         }
         
         return MODULE_CONSTANTS;
}