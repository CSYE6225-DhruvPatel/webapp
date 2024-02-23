variable "project_id" {}

source "googlecompute" "centos" {
  project_id          = var.project_id
  source_image_family = "centos-stream-8"
  zone                = "us-central1-a"
  machine_type        = "n1-standard-1"
  ssh_username        = "centos"
}

build {
  sources = ["source.googlecompute.centos"]

  provisioner "shell" {
    inline = [
      "mkdir dhruv",
      "cd dhruv"
    ]
  }

  provisioner "file" {
    source      = "webapp.zip"
    destination = "/dhruv/webapp.zip"
  }

  provisioner "file" {
    source      = "./packer/execute.service"
    destination = "/dhruv/execute.service"
  }

  provisioner "file" {
    source      = "packer/install-script.sh"
    destination = "/dhruv/install-script.sh"
  }

  provisioner "file" {
    source      = "packer/postgres.sh"
    destination = "/dhruv/postgres.sh"
  }

  provisioner "file" {
    source      = "packer/setup-npm.sh"
    destination = "/dhruv/setup-npm.sh"
  }

}
