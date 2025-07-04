from backend.workflow.subtasks.trader_subtask import TraderSubTask


class TraderRiskWorkflow:
    def __init__(self):
        self.task = TraderSubTask()

    async def run(self, message, context):
        return await self.task.process(message, context)
