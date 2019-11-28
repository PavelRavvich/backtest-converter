import { AbstractControl, FormGroup } from '@angular/forms';

const defaultCb = (value: any) => !!value;

// Depended controls in form
export function subControl(
    master: AbstractControl,
    slave: AbstractControl,
    callback?: (value: any) => boolean,
    defaultValue: any = null,
): void {

    const check = () => {
        const cb = callback || defaultCb;
        if (master.disabled) {
            slave.disable();
        } else {
            if (cb(master.value)) {
                slave.enable();
            } else {
                slave.disable();
            }
        }
    };

    master.statusChanges.subscribe(() => {
        check();
    });
    master.valueChanges.subscribe(() => {
        if (master.dirty) {
            slave.reset(defaultValue);
        }
        check();
    });
    check();
}

// Depended controls in form (value only)
export function subControlValue(
    group: FormGroup,
    master: string,
    slave: string,
    callback?: (value: any) => boolean,
    defaultValue: any = null,
): void {
    const masterControl = group.get(master);
    const slaveControl = group.get(slave);
    const check = () => {
        const masterValue = group.getRawValue()[master];
        const cb = callback || defaultCb;
        if (cb(masterValue)) {
            slaveControl.enable();
        } else {
            slaveControl.disable();
        }
    };

    masterControl.statusChanges.subscribe(() => {
        check();
    });
    masterControl.valueChanges.subscribe(() => {
        if (masterControl.dirty) {
            slaveControl.reset(defaultValue);
        }
        check();
    });
    check();
}

// Depended control from external condition
export function subFormControl(
    group: FormGroup,
    control: AbstractControl,
    callback: (value: any) => boolean,
): void {

    const check = () => {
        const cmp = callback(control.value);
        if (cmp && control.disabled) {
            control.enable();
        }
        if (!cmp && control.enabled) {
            control.disable();
        }
    };

    group.statusChanges.subscribe(() => {
        check();
    });
    check();
}

export function skipControlValidation(
    control: AbstractControl
): void {
    control.reset();
    control.markAsPristine();
    control.setErrors(null);
}
