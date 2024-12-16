const session = await stripe.checkout.sessions.create({
  // ... autres configurations ...
})

// Mettre à jour l'utilisateur avec le nom de livraison
await db.user.update({
  where: { id: userId },
  data: {
    name: shippingAddress.name
  }
}) 