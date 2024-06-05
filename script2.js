document.addEventListener('DOMContentLoaded', (event) => {
    // Define the codon table
    const codonTable = {
        'AUG': { name: 'MethionineMET', abbrev: 'Met' },
        'UUU': { name: 'PhenylalaninePHE', abbrev: 'Phe' },
        'UUC': { name: 'PhenylalaninePHE', abbrev: 'Phe' },
        // Add other codon mappings
    };

    // Initialize button and content variables
    var btn1 = document.querySelector('#btn1');
    var btn2 = document.querySelector('#btn2');
    var con1 = document.querySelector('#con1');
    var con2 = document.querySelector('#con2');

    // Button click event listeners
    btn1.addEventListener('click', function() {
        toggleContent(this, btn2, con1, con2);
    });

    btn2.addEventListener('click', function() {
        toggleContent(this, btn1, con2, con1);
    });

    // Nucleotide change event listeners
    document.querySelectorAll('.nucleotide').forEach(element => {
        element.addEventListener('change', function () {
            updateAminoAcidImage();
        });
    });

    

    // Helper functions
    function toggleContent(activeBtn, inactiveBtn, activeCon, inactiveCon) {
        if (!activeBtn.classList.contains('btn-primary')) {
            activeBtn.classList.replace('btn-secondary', 'btn-primary');
            inactiveBtn.classList.replace('btn-primary', 'btn-secondary');
            activeCon.style.display = 'block';
            inactiveCon.style.display = 'none';
        }
    }

    function updateAminoAcidImage() {
        let nucleotide1 = document.getElementById('nucleotide1').value;
        let nucleotide2 = document.getElementById('nucleotide2').value;
        let nucleotide3 = document.getElementById('nucleotide3').value;
        let codon = nucleotide1 + nucleotide2 + nucleotide3;
        let aminoAcid = getAminoAcid(codon);
        document.getElementById('amino-acid-image').innerHTML = `<img src="images/${aminoAcid.name}.svg" alt="${aminoAcid.name}" class="bd-placeholder-img card-img-top" width="100%">`;
    }

    function getAminoAcid(codon) {
        return codonTable[codon] || { name: 'Unknown', abbrev: '???' };
    }

    // RNA sequence keyup event listener
    document.getElementById('rna-sequence').addEventListener('keyup', function () {
        displayRNASequence(this.value.toUpperCase());
    });
    
    function displayRNASequence(sequence) {
        // let speed = parseInt(document.getElementById('animation-speed').value);
        document.getElementById('rna-display').innerHTML = '';
        document.querySelector('#amino-acid-table tbody').innerHTML = '';
        for (let i = 0; i < sequence.length; i += 3) {
            let codon = sequence.substr(i, 3);
            $('#rna-display').append(`<span style="background-color:powderblue;">${codon}</span>`);
            let aminoAcid = getAminoAcid(codon);
                document.querySelector('#amino-acid-table tbody').append(
                    `<tr>
                        <td>${aminoAcid.name}</td>
                        <td>${aminoAcid.abbrev}</td>
                        <td><img src="images/${aminoAcid.name}.png" alt="${aminoAcid.name}" class="amino-acid-image"></td>
                    </tr>`
                );}
        // sequence.match(/.{1,3}/g).forEach((codon, index) => {
        //     let aminoAcid = getAminoAcid(codon);
        //         document.querySelector('#amino-acid-table tbody').innerHTML += `
        //             <tr>
        //                 <td>${aminoAcid.name}</td>
        //                 <td>${aminoAcid.abbrev}</td>
        //                 <td><img src="images/${aminoAcid.name}.svg" alt="${aminoAcid.name}" class="amino-acid-image"></td>
        //             </tr>`;
        //     // setTimeout(() => {
        //     //     // let aminoAcid = getAminoAcid(codon);
        //     //     // document.querySelector('#amino-acid-table tbody').innerHTML += `
        //     //     //     <tr>
        //     //     //         <td>${aminoAcid.name}</td>
        //     //     //         <td>${aminoAcid.abbrev}</td>
        //     //     //         <td><img src="images/${aminoAcid.name}.svg" alt="${aminoAcid.name}" class="amino-acid-image"></td>
        //     //     //     </tr>`;
        //     // }, index * speed);
        // });
    }
});
