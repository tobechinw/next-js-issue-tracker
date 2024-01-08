import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
    const containers: { label: string; value: number; status: Status }[] = [
        { label: 'Open Issues', value: open, status: 'OPEN' },
        {
            label: 'Issues in Progress',
            value: inProgress,
            status: 'IN_PROGRESS'
        },
        { label: 'Open Issues', value: closed, status: 'CLOSED' }
    ];
    return (
        <Flex gap={'4'}>
            {containers.map((container) => (
                <Card key={container.label}>
                    <Flex gap={'1'} direction={'column'}>
                        <Link
                            className="text-sm font-medium"
                            href={`/issues?status=${container.status}`}
                        >
                            {container.label}
                        </Link>
                        <Text size={'5'} className="font-bold">
                            {container.value}
                        </Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    );
};

export default IssueSummary;
