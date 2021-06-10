import React from 'react';
import './style.scss'
export class Logs extends React.Component {
    state = {
        log: [
            {
                activity: 'New appointment completed',
                time: '10:10'
            },
            {
                activity: 'Notification from bank',
                time: '05:10',
            },
            {
                activity: 'Transaction success alert',
                time: '09:15',
            },
            {
                activity: 'New customer added',
                time: '06:15',
            },
            {
                activity: 'New salon added',
                time: '10:10',
            },
            {
                activity: 'New product sale',
                time: '05:10',
            },
            {
                activity: 'New appointment fixed',
                time: '09:15',
            },
        ]
    }
    render() {
        let { log } = this.state
        return (
            <>
                <h3 className="team-label my-4">Logs</h3>
                <div className="logs">
                    <div className="card">
                        <p className="label">Activities log</p>
                        <div className="my-4">
                        {log && log.map((data, index) => (
                        <div key={index} className="d-flex align-items-center">
                                <div className="d-flex justify-content-between w-100 mb-2">
                                    <div className="d-flex align-items-center">
                                        <p className="red-circle"></p>
                                        <p>{data.activity}</p>
                                    </div>
                                    <div>
                                        <p className="mr-3">{data.time}</p>
                                    </div>
                                </div>
                        </div>
                        ))}
                        </div>

                    </div>
                </div>
            </>
        );
    }
}