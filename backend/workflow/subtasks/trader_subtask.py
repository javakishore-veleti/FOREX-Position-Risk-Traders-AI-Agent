from backend.service.impl.trader_service_impl import TraderRiskServiceImpl

class TraderSubTask:
    def __init__(self):
        self.service = TraderRiskServiceImpl()

    async def process(self, message, scope):
        return await self.service.get_response(message, scope)
