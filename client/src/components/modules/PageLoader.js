import React, { Component } from 'react';
import {Segment, Image, Dimmer, Loader} from 'semantic-ui-react';
export default class PageLoader extends Component {
    render() {
        return (
            <div>
                <Segment>
                <Dimmer active>
                    <Loader />
                </Dimmer>
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                </Segment>
            </div>
        )
    }
}
