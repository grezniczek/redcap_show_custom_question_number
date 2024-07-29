<?php namespace DE\RUB\ShowCustomQuestionNumbersExternalModule;

/**
 * ExternalModule class for Show Custom Question Numbers.
 */
class ShowCustomQuestionNumbersExternalModule extends \ExternalModules\AbstractExternalModule {

    #region Hooks

    function redcap_data_entry_form($project_id, $record, $instrument, $event_id, $group_id, $repeat_instance) {
        $enabled_forms = $this->getProjectSetting("forms");
        
        if (in_array($instrument, $enabled_forms, true)) {
            $this->show_custom_question_numbers($GLOBALS["Proj"], $instrument);
        }
    }

    #endregion

    #region Implementation

    private function show_custom_question_numbers($Proj, $form) {

        // Is the form enabled as a survey?
        $survey_id = $Proj->forms[$form]['survey_id'] ?? "";
        if ($survey_id == "") return;

        // Does the survey have custom question numbers?
        $survey = $Proj->surveys[$survey_id];
        if ($survey["question_auto_numbering"] == "1") return;

        // Get the custom question numbers
        $custom_question_numbers = [];
        foreach ($Proj->forms[$form]["fields"] as $field => $_) {
            $cqn = $Proj->metadata[$field]["question_num"];
            if (!empty($cqn)) {
                $custom_question_numbers[$field] = $Proj->metadata[$field]["question_num"];
            }
        }
        if (count($custom_question_numbers) == 0) return;

        // Initialize the module with all necessary data
        require_once "classes/InjectionHelper.php";
        $this->framework->initializeJavascriptModuleObject();
        $jsmo_name = json_encode($this->framework->getJavascriptModuleObjectName());
        $ih = InjectionHelper::init($this);
        $ih->js("js/showCustomQuestionNumbers.js");
        $config = json_encode([
            "debug" => $this->getProjectSetting("debug") == "1",
            "version" => $this->VERSION,
            "questionNumbers" => $custom_question_numbers,
        ]);
        print \RCView::script("DE_RUB_ShowCustomQestionNumbers.init($config, $jsmo_name);", true);
    }

    #endregion
}