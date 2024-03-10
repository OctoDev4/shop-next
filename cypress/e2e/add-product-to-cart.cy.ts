describe('add product to cart', () => {
  beforeEach(()=>{
    
    cy.visit('http://localhost:3000')
  })

  it('should be able to navigate to the product page and add it to the cart', () => {
   

    // Clica no primeiro link de produto encontrado na página inicial
    cy.get('a[href^="/product"]').first().click()

    // Verifica se a URL foi alterada para incluir "/product"
    cy.location('pathname').should('include','/product')

    // Clica no botão "Adicionar ao Carrinho" na página do produto
    cy.contains('Adicionar ao Carrinho').click()

    // Verifica se o texto "cart (1)" existe na página, indicando que um item foi adicionado ao carrinho
    cy.contains('cart (1)').should('exist')
  })
})


// Este teste verifica se um item duplicado não é contado duas vezes no carrinho
it('should not count duplicate items products on cart', () => {
  // Visita a página inicial da aplicação
  cy.visit('http://localhost:3000')

  // Clica no primeiro link de produto encontrado na página inicial
  cy.get('a[href^="/product"]').first().click()

  // Verifica se a URL foi alterada para incluir "/product"
  cy.location('pathname').should('include','/product')

  // Clica duas vezes no botão "Adicionar ao Carrinho" na página do produto
  cy.contains('Adicionar ao Carrinho').click()
  cy.contains('Adicionar ao Carrinho').click()

  // Verifica se o texto "cart (1)" existe na página, indicando que apenas um item foi adicionado ao carrinho, mesmo que tenha sido clicado duas vezes
  cy.contains('cart (1)').should('exist')
})


// Este teste verifica se é possível buscar um produto e adicioná-lo ao carrinho
it('should be able to search a product and add it to the cart', () => {
  // Visita a página inicial da aplicação
  cy.visit('http://localhost:3000')

  // Digita "moletom" no campo de busca e envia o formulário
  cy.get('input[name=q]').type('moletom').parent('form').submit()

  // Clica no primeiro link de produto encontrado na página de resultados da busca
  cy.get('a[href^="/product"]').first().click()

  // Verifica se a URL foi alterada para incluir "/product"
  cy.location('pathname').should('include','/product')

  // Clica no botão "Adicionar ao Carrinho" na página do produto
  cy.contains('Adicionar ao Carrinho').click()

  // Verifica se o texto "cart (1)" existe na página, indicando que um item foi adicionado ao carrinho
  cy.contains('cart (1)').should('exist')
})
