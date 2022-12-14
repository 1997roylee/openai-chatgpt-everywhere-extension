import { MessageBox } from './MessageBox'
import { Box, Divider, Stack } from '@mantine/core'
import { IMessage, useAppStore } from '../../stores'
import { useEffect, useRef } from 'react'
import { ErrorMessageBox } from './ErrorMessageBox'

export const MessagePanel = (): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null)
    const { getMessageList, lastUpdatedAt } = useAppStore((state: any) => ({
        getMessageList: state.getMessageList,
        lastUpdatedAt: state.lastUpdatedAt,
    }))

    // console.log(lastUpdatedAt);
    useEffect(() => {
        // console.log('scrolling')
        if (ref.current != null) ref.current.scrollIntoView({ behavior: 'smooth' })
    }, [lastUpdatedAt])

    return (
        <Stack
            spacing={0}
            sx={{
                flex: 1,
                overflowY: 'scroll',
                paddingBottom: 40,
            }}
        >
            <Box>
                {getMessageList().map((message: IMessage, index: number) => {
                    return (
                        <Box key={`Message_${message.id}`}>
                            {message.id === 'Error' ? (
                                <ErrorMessageBox />
                            ) : (
                                <MessageBox isMe={message.sender === 'me'} message={message.text} />
                            )}

                            {index < getMessageList().length - 1 && <Divider color='#eee' />}
                        </Box>
                    )
                })}
                <Box ref={ref} />
            </Box>
        </Stack>
    )
}
