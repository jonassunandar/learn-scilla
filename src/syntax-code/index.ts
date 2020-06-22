import { scillaLanguage, scillaConfiguration } from './scilla/scilla';
import { solidtyLanguage, solidityConfiguration } from './solidity/solidity';

function convert(language, configuration){
    return {
        'language': language,
        'configuration': configuration
    }
}

export default {
    'scilla': convert(scillaLanguage, scillaConfiguration),
    'solidity': convert(solidtyLanguage, solidityConfiguration)
}
