/* eslint-disable no-underscore-dangle */
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class Speech {

    constructor(
        private speechRecognition: SpeechRecognition
    ) {}

    getPermission() {
        const obser = from(this.speechRecognition.hasPermission());
        obser.pipe(take(1)).subscribe(data => {
            if (!data) {
                this.speechRecognition.requestPermission();
            }
        });
    }

    initServiceSpeech() {
        const options = {
            language: 'es-CL',
            showPartial: true,
            matches: 1
        };
        return this.speechRecognition.startListening(options);
    }

    stopServiceSpeech(){
        return this.speechRecognition.stopListening();
    }
}
