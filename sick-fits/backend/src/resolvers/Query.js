const { forwardTo } = require("prisma-binding");

const Query = {
  // forward simple GET request from Yoga to Prisma:
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    // check if there is a current userId
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
  },
};

module.exports = Query;
