// Show Custom Question Numbers - REDCap External Module
// Dr. Günther Rezniczek, Ruhr-Universität Bochum, Marien Hospital Herne
// @ts-check
;(function() {

//#region Constants & Variables

const moduleNamePrefix = 'DE_RUB_';
const moduleName = 'ShowCustomQestionNumbers';

// @ts-ignore
const MODULE = window[moduleNamePrefix + moduleName] ?? {
    init: initialize,
};
// @ts-ignore
window[moduleNamePrefix + moduleName] = MODULE;

let config = {
    debug: false,
    version: '??',
    questionNumbers: [],
    prefix: '',
    suffix: ''
};
let JSMO = {};

let initialized = false;

//#endregion

//#region Initialization

/**
 * Initializes the module
 * @param {Object} config_data 
 * @param {Object} jsmo_obj 
 */
function initialize(config_data, jsmo_obj = null) {
    if (!initialized) {
        if (config_data) {
            config = config_data;
        }
        if (jsmo_obj) {
            JSMO = jsmo_obj;
        }
        initialized = true;
        log('Initialized', config, JSMO);
        // Add custom question numbers to the form each time it is updated
        JSMO.afterRender(addNumbersToForm);
    }
}

//#endregion

function addNumbersToForm() {
    log('Adding custom question numbers to the form ...');
    for (const fieldName in config.questionNumbers) {
        const customNumber = config.questionNumbers[fieldName];
        const $label = $('[data-mlm-field="' + fieldName + '"][data-mlm-type="label"]');
        $label.prepend('<div class="form-custom-question-number">' + config.prefix + customNumber + config.suffix + '</div>');
        log('Proessed "'+fieldName+'"');
    }
}

//#region Debug Logging

function getLineNumber() {
    try {
        const line = ((new Error).stack ?? '').split('\n')[3];
        const parts = line.split(':');
        return parts[parts.length - 2];
    }
    catch(err) {
        return '??';
    }
}
/**
 * Logs a message to the console when in debug mode
 */
function log() {
    if (!config.debug) return;
    log_print(getLineNumber(), 'log', arguments);
}
/**
 * Logs a warning to the console when in debug mode
 */
function warn() {
    if (!config.debug) return;
    log_print(getLineNumber(), 'warn', arguments);
}

/**
 * Logs an error to the console when in debug mode
 */
function error() {
    log_print(getLineNumber(), 'error', arguments);;
}

/**
 * Prints to the console
 * @param {string} ln Line number where log was called from
 * @param {'log'|'warn'|'error'} mode
 * @param {IArguments} args
 */
function log_print(ln, mode, args) {
    const prompt = moduleName + ' ' + config.version + ' [' + ln + ']';
    switch(args.length) {
        case 1:
            console[mode](prompt, args[0]);
            break;
        case 2:
            console[mode](prompt, args[0], args[1]);
            break;
        case 3:
            console[mode](prompt, args[0], args[1], args[2]);
            break;
        case 4:
            console[mode](prompt, args[0], args[1], args[2], args[3]);
            break;
        case 5:
            console[mode](prompt, args[0], args[1], args[2], args[3], args[4]);
            break;
        case 6:
            console[mode](prompt, args[0], args[1], args[2], args[3], args[4], args[5]);
            break;
        default:
            console[mode](prompt, args);
            break;
    }
}

//#endregion
})();