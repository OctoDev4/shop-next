describe('search products', () => {
  beforeEach(() => {
    // Visita a página inicial antes de cada teste
    cy.visit('http://localhost:3000')
  })

  it('should be able to search for products', () => {
    // Digita "moletom" no campo de busca e envia o formulário
    cy.get('input[name=q]').type('moletom').parent('form').submit()

    // Verifica se a URL da página de resultados da busca contém '/search'
    cy.location('pathname').should('include', '/search')

    // Verifica se o parâmetro de busca 'q' na URL é 'moletom'
    cy.location('search').should('eq', '?q=moletom')

    // Verifica se os links de produtos são exibidos na página de resultados da busca
    cy.get('a[href^="/product"]').should('exist')

    // Clica no primeiro link de produto encontrado na página de resultados da busca
    cy.get('a[href^="/product"]').first().click()

    // Verifica se a URL foi redirecionada para a página do produto
    cy.location('pathname').should('include', '/product')
  })

  it('should not be able to visit a page without a search query', () => {
    // Impede que a exceção 'uncaught:exception' cause a falha do teste
    cy.on('uncaught:exception', () => {
      return false
    })

    // Visita a página de resultados de busca sem fornecer uma consulta de busca
    cy.visit('/search')

    // Verifica se a URL foi redirecionada de volta para a página inicial
    cy.location('pathname').should('equal', '/')
  })
})
