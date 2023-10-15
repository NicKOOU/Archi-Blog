provider "azurerm" {
  features {}
  skip_provider_registration = true
}

resource "azurerm_resource_group" "my-rg" {
  name     = "Ressource_group_AKS_infra"
  location = "francecentral"
}

resource "azurerm_kubernetes_cluster" "my-aks" {
  name                = "Cluster_AKS_infra"
  location            = azurerm_resource_group.my-rg.location
  resource_group_name = azurerm_resource_group.my-rg.name
  dns_prefix          = "aks-infra"

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = "Standard_DS2_v2"
  }

  service_principal {
    client_id     = "4a045f80-1844-424e-b344-54908984d153"
    client_secret = "xth8Q~plQCL6Q5Idr2f26fck01-pPFKXPdLSTdgC"
  }
}