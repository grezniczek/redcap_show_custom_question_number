# Show Custom Question Numbers

A REDCap external module that will show custom survey question numbers in data entry forms

## Requirements

REDCap with External Module Framework version 14.

## Configuration

Configuration of this module is performed using the **module configuration dialog** in each project.

- **Debug mode**: For troubleshooting only. When enabled, some info will be output to the browser's console during module operation.
- **Set forms**: The _Enable display of custom question numbers on this form_ option must be used to define the forms where the module should be active.
- **Custom CSS**: If desired, CSS rules can be added for the CSS class `form-custom-question-number`. It is possible to override these on any form by adding custom CSS directly on the form (see example below).
- **Prefix** and **suffix**: A prefix and/or suffix can be defined. These will be added immediately before/after the custom question number. This features can be used, e.g., to wrap custom question number with some additional HTML.

## How it works

The module will inject a `DIV` element (with the CSS class `form-custom-question-number`) that contains the custom question number (when set) before the label content of a field. E.g., for a question numbered '7b', the output would be:
```HTML
<div class="form-custom-question-number">7b</div>
```
If prefix and suffix were set to `<span class="badge badge-info">` and `</span>`, respectively, the output would be this:
```HTML
<div class="form-custom-question-number">
    <span class="badge badge-info">7b</span>
</div>
```

To override the styling in a specific form, something like this can be added to any label (or as the label of a hidden field):
```HTML
<style>
    .form-custom-question-number {
        display: inline-block;
        padding: 2px;
        border: 1px solid orange;
    }
</style>
```



## Changelog

Version | Description
------- | -------------------
v1.0.0  | Initial release.
