import {Text, TouchableOpacity} from 'react-native'

interface ButtonProps {
    children: string
}

export function Button({
    children
                       }: ButtonProps) {
    return (
        <TouchableOpacity>
            <Text>{children}</Text>
        </TouchableOpacity>
    )
}