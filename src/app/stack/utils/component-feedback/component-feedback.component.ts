/** Vendor imports Go HERE */
import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
/** Vendor imports Go HERE */

import {
    MComponentFeedback,
    MGenericStackInformation
} from '../../models/ui.model';

import { ComponentFeedbackService } from './component-feedback.service';

@Component({
    selector: 'component-feedback',
    styleUrls: ['./component-feedback.component.less'],
    providers: [ComponentFeedbackService],
    templateUrl: './component-feedback.component.html'
})
export class ComponentFeedbackComponent implements OnChanges {
    @Input() feedback: MComponentFeedback;
    @Input() genericInformation: MGenericStackInformation;

    feedbackMessages: Array<any> = [];

    constructor(private feedbackService: ComponentFeedbackService) {}

    public handleFeedback(event: MouseEvent, type: boolean): void {
        event.stopPropagation();
        if (this.feedback && this.feedback.feedbackTemplate) {
            this.feedback.feedbackTemplate.feedback_type = type;
            let token: string = this.genericInformation && this.genericInformation['access_token'];
            let subscription = this.feedbackService.postFeedback(this.feedback, token);
            if (subscription) {
                subscription.subscribe((result) => {
                    this.feedbackMessages.push({
                        text: 'Feedback successfully submitted',
                        iconClass: 'pficon-ok'
                    });
                });
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        let summary: any = changes['feedback'];
        if (summary) {
            this.feedback = <MComponentFeedback> summary.currentValue;
        }
    }
}
