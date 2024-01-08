import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import AssigneeSelect from './AssigneeSelect';
import { title } from 'process';

interface Props {
    params: { id: string };
}

const pages = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue) notFound();

    return (
        <Grid gap="5" columns={{ initial: '1', sm: '5' }}>
            <Box className="md:col-span-4">
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <Flex direction={'column'} gap={'4'}>
                    <AssigneeSelect issue={issue} />
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>
        </Grid>
    );
};

export async function generateMetadata({ params }: Props) {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });
    return {
        title: issue?.title,
        description: `Details of issue ${issue?.id}`
    };
}

export default pages;
