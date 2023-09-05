// Fonction touvée sur le net et réutilisable
// Qui permet de check si une image a une URL valide

export const checkImageURL = (url) => {
  if (!url) return false;
  else {
    const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
    return pattern.test(url);
  }
};