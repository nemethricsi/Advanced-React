const { forwardTo } = require("prisma-binding");

const Query = {
  // forward simple GET request from Yoga to Prisma:
  items: forwardTo("db"),

  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  // },
};

module.exports = Query;
