import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-input-text',
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputTextComponent), multi: true},
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => InputTextComponent), multi: true}
    ],
    template: `
        <div class="form-group">
            <label class="form-control-label"> {{label}}: <span
                    class="star">*</span></label>
            <input type="text" [value]="innerValue" class="form-control" (input)="onChange($event)"/>
            <app-show-errors [control]="control"></app-show-errors>
        </div>
    `,
    styles: [`.form-control-label.required:after {
        color: #d00;
        content: "*";
        position: absolute;
        margin-left: 5px;
        top: 7px;
    }`]
})
export class InputTextComponent implements ControlValueAccessor {

    @Input() label: string;

    private innerValue: string;

    private control: FormControl;
    private propagateChange = (_: any) => { };

    onChange(event) {
        this.propagateChange(event.target.value);
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    get value(): any {
        return this.innerValue;
    }

    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }

    writeValue(obj: any): void {
        console.log('write');
        this.value = obj;
        if (obj) {
            console.log(obj);
        }
    }


    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    validate(c: FormControl) {
        this.control = c;
    }
}
