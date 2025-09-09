import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers.pil import RoundedModuleDrawer
from qrcode.image.styles.colormasks import RadialGradiantColorMask
from PIL import Image

# === URL do seu portfólio ===
url = "https://tattianerl.github.io/Portifolio/"

# === Criando o QR Code ===
qr = qrcode.QRCode(
    version=4,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=12,
    border=4,
)
qr.add_data(url)
qr.make(fit=True)

# === Gerando imagem estilizada ===
img = qr.make_image(
    image_factory=StyledPilImage,
    module_drawer=RoundedModuleDrawer(),
    color_mask=RadialGradiantColorMask(
        center_color=(108, 99, 255),  # roxo
        edge_color=(35, 196, 227)     # azul
    )
)

# === Inserindo logo no centro ===
logo_path = r"C:\Portifolio-Frontend\qr_code\logo_qr.png"

try:
    logo = Image.open(logo_path)

    # Ajustar tamanho da logo (30% do QR)
    qr_width, qr_height = img.size
    logo_size = int(qr_width * 0.3)
    logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)

    # Criar fundo branco atrás da logo
    box = Image.new("RGBA", (logo_size + 20, logo_size + 20), "white")
    pos_box = ((qr_width - box.size[0]) // 2, (qr_height - box.size[1]) // 2)
    img.paste(box, pos_box, box)

    # Colocar logo por cima do fundo
    pos_logo = ((qr_width - logo_size) // 2, (qr_height - logo_size) // 2)
    img.paste(logo, pos_logo, mask=logo if logo.mode == "RGBA" else None)

except FileNotFoundError:
    print("⚠️ Logo não encontrada, gerando QR Code sem logo.")

# === Salvar resultado final ===
img.save("qr_portifolio.png")
print("✅ QR Code estilizado gerado: qr_portifolio.png")
