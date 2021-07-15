import React, { Component } from 'react'

export class NormalTextarea extends Component {
    render() {
        let {
            className = "form-control",
            placeholder = "",
            onChange,
            value = "",
            name,
            disabled = false,
            type = 'text' } = this.props;

        return (
            <>
                <textarea
                    className={className}
                    name={name}
                    disabled={disabled}
                    value={value}
                    placeholder={placeholder}
                    onChange={e => {

                        let body = {}

                        body = {
                            target: {
                                name: e.target.name,
                                value: e.target.value
                            }
                        }

                        onChange(body)

                    }}
                ></textarea>
            </>
        )
    }
}