variable "project_id" {}

source "googlecompute" "centos" {
  project_id          = var.project_id
  source_image_family = "centos-stream-8"
  zone                = "us-west1-a"
  machine_type        = "n1-standard-1"
  ssh_username        = "centos"
}

build {
  sources = ["source.googlecompute.centos"]

  provisioner "file" {
    source      = "webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "file" {
    source      = "./packer/execute.service"
    destination = "/tmp/execute.service"
  }

  provisioner "file" {
    source      = "packer/install-script.sh"
    destination = "/tmp/install-script.sh"
  }

  provisioner "file" {
    source      = "packer/setup-npm.sh"
    destination = "/tmp/setup-npm.sh"
  }

  provisioner "file" {
    source      = "packer/ops-agent.sh"
    destination = "/tmp/ops-agent.sh"
  }

  provisioner "shell" {
    inline = [
      "chmod +x /tmp/install-script.sh",
      "/tmp/install-script.sh",
      "chmod +x /tmp/ops-agent.sh",
      "/tmp/ops-agent.sh",
      "chmod +x /tmp/setup-npm.sh",
      "/tmp/setup-npm.sh"
    ]
  }
}
