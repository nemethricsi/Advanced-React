const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          // title: args.title,
          // description: args.description,
          ...args,
        },
      },
      info
    );

    return item;
  },
};

module.exports = Mutations;
